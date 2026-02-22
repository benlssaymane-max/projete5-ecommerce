import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    await connectDB();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'user' });

    const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });

    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Registration failed.' }, { status: 500 });
  }
}