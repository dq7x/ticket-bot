import mongoose from 'mongoose';
import chalk from 'chalk';

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.green('✓ MongoDB connected\n'));
  } catch (error) {
    console.error(chalk.red('✗ MongoDB connection failed:'), error.message);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  console.log(chalk.yellow('⚠ MongoDB disconnected'));
});

mongoose.connection.on('reconnected', () => {
  console.log(chalk.green('✓ MongoDB reconnected'));
});

export default {
  connectDatabase
};
