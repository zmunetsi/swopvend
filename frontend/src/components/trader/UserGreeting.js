'use client';

export default function UserGreeting({ user }) {
  if (!user) return null;
  return (
    <div className="font-medium mb-4">
      Welcome back, <span className="font-bold">{user.first_name || user.username || 'User'}!</span> 👋
    </div>
  );
}