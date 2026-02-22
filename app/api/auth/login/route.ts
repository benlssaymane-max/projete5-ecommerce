import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });
    return NextResponse.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 });
  }
}