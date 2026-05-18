import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import TopBar from '../components/TopBar';
import { categories, courses } from '../data/courses';

export default function CategoryPage({ openCourse }) {
  const [active, setActive] = useState('全部');
  const list = active === '全部' ? courses : courses.filter((c) => c.category === active);

  return (
    <>
      <TopBar title="课程分类 / Categories" />
      <main className="mx-auto flex min-h-screen max-w-md bg-slate-50 pb-20">
        <aside className="w-24 border-r bg-white pt-4">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`block w-full px-3 py-4 text-center text-sm ${active === cat ? 'border-l-4 border-rose-500 bg-rose-50 font-black text-rose-500' : 'text-slate-500'}`}>{cat}</button>
          ))}
        </aside>
        <section className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-3">{list.map((course) => <CourseCard key={course.id} course={course} onOpen={openCourse} />)}</div>
        </section>
      </main>
    </>
  );
}
