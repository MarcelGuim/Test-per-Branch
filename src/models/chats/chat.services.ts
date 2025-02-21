import { promises } from 'dns';
import {IChat} from './chat.model';
import Chat from './chat.model';
import User from '../users/user.model';


export class ChatService {
  async sendMessage(data: Partial<IChat>): Promise<IChat> {
    const chat = new Chat(data);
    return await chat.save();
  }

  async getPeopleWithWhomUserChatted(name: string): Promise<string[]> {
    try{
        const chats = await Chat.find({$or: [{from: name}, {to:name}]});
        const people: string[] = [];
        chats.forEach(chat => {
            if(chat.from === name && !people.includes(chat.to)){
                people.push(chat.to);
            }
            else if (chat.to === name && !people.includes(chat.from)){
                people.push(chat.from);
            }
            });
        return people;
    }
    catch(error){
        throw new Error('Error fetching chats');
    }
 }
    async getChatsWithUser(name1:string, name2:string): Promise<IChat[]>{ 
        try{
            const user1 = User.findOne({name: name1});
            const user2 = User.findOne({name: name2});
            if(user1 === null || user2 === null){
                throw new Error("Wrong users");
            }
            else if(user1 === user2){
                throw new Error("Same user");
            }
            else{
                const chats = Chat.find({$or: [{from: name1, to: name2}, {from: name2, to: name1}]});
                return chats;
            }
        }
        catch(error){
            throw new Error("Error fetching chats");
        }
    }

}