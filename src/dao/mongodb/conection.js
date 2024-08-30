import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://jazminaramos4:proyecto1@cluster0.lrodu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
}
