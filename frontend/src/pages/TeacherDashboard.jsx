import React from 'react';

const sections = [
    { title: 'Timetable', body: 'Your timetable will be displayed here.' },
    { title: 'Salary Slip', body: 'Your salary slip details will be available here.' },
    { title: 'Feedback', body: 'Feedback from students will be shown here.' },
    { title: 'Announcements', body: 'Latest announcements and notifications will appear here.' },
    { title: 'Profile Edit', body: 'Edit your profile information here.' },
];

const TeacherDashboard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 p-6">
            <div className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">Teacher Dashboard</h1>
                    <div className="text-sm text-white/90">Welcome back — have a great day!</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((s) => (
                        <article
                            key={s.title}
                            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:scale-[1.02] transform transition shadow-sm"
                        >
                            <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                            <p className="mt-2 text-sm text-white/80">{s.body}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2 p-5 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Quick Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 rounded bg-white/12 text-white/90 border border-white/10 hover:bg-white/20 transition">Create Announcement</button>
                            <button className="px-4 py-2 rounded bg-white/12 text-white/90 border border-white/10 hover:bg-white/20 transition">Upload Timetable</button>
                            <button className="px-4 py-2 rounded bg-white/12 text-white/90 border border-white/10 hover:bg-white/20 transition">View Salary</button>
                        </div>
                    </div>

                    <aside className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Notifications</h3>
                        <ul className="text-white/80 text-sm space-y-2">
                            <li>- No new notifications</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;