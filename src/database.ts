import mongoose from 'mongoose';

class ConnectDB {
  private static connection: mongoose.Connection | null = null;

  // Connect to the MongoDB database
  public static async connect(): Promise<void> {
    if (this.connection && this.connection.readyState === 1) {
      console.log('🟢 Already connected to MongoDB');
      return;
    }

    try {
      const dbURI = 'mongodb://localhost:27017/usuaris'; // Canvia segons la teva configuració
      mongoose.set('strictQuery', false); // O true, segons necessitis
      
      // Connectar a MongoDB amb opcions recomanades
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions);

      this.connection = mongoose.connection;

      this.connection.once('open', () => {
        console.log('🟢 MongoDB connected successfully');
      });

      this.connection.on('error', (error) => {
        console.error('🔴 MongoDB connection error:', error);
      });

    } catch (error) {
      console.error('❌ Error connecting to MongoDB:', error);
      throw error;
    }
  }

  // Disconnect from MongoDB
  public static async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null; // Important per evitar errors futurs
      console.log('🔴 MongoDB disconnected successfully');
    }
  }
}

export default ConnectDB;