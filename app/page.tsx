"use client";

import { useMemo, useState } from "react";

type Category = "学习" | "体育" | "音乐" | "阅读";
type Task = { id:number; time:string; duration:string; category:Category; title:string; detail:string; done:boolean; icon:string };

const initialTasks: Task[] = [
  { id:1, time:"07:30", duration:"30 分钟", category:"阅读", title:"晨间阅读", detail:"《小王子》第 4–5 章", done:true, icon:"☼" },
  { id:2, time:"09:00", duration:"45 分钟", category:"学习", title:"数学练习", detail:"完成分数应用题 1–12 题", done:false, icon:"✎" },
  { id:3, time:"10:30", duration:"30 分钟", category:"音乐", title:"钢琴练习", detail:"音阶练习 +《小步舞曲》", done:false, icon:"♫" },
  { id:4, time:"15:30", duration:"45 分钟", category:"体育", title:"hockey训练", detail:"基础动作 15 分钟，专项练习 30 分钟", done:false, icon:"●" },
  { id:5, time:"19:30", duration:"40 分钟", category:"学习", title:"中文作业", detail:"完成阅读练习并复习生字", done:false, icon:"文" },
];
const categoryClass: Record<Category,string> = { 学习:"study", 体育:"sport", 音乐:"music", 阅读:"reading" };

export default function Home() {
  const [tasks,setTasks] = useState(initialTasks);
  const [filter,setFilter] = useState<"全部"|Category>("全部");
  const [quoteVisible,setQuoteVisible] = useState(true);
  const completed = tasks.filter((task)=>task.done).length;
  const progress = Math.round(completed/tasks.length*100);
  const visibleTasks = useMemo(()=>tasks.filter((task)=>filter==="全部"||task.category===filter),[tasks,filter]);
  const toggleTask = (id:number) => setTasks((current)=>current.map((task)=>task.id===id?{...task,done:!task.done}:task));

  return <main className="page-shell">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="向上学习首页"><span className="brand-mark">↗</span><span>向上学习</span></a>
      <div className="date-block"><span>星期日 · 8月16日</span><strong>今天也要加油呀</strong></div>
      <button className="avatar" aria-label="个人中心">悠</button>
    </header>

    <section className="hero" id="top">
      <div><p className="eyebrow">MY DAY · 2026</p><h1>你好，ula！<br/><em>把今天过得闪闪发光。</em></h1><p className="intro">把每一件小事认真做好，进步就在不知不觉间发生。</p></div>
      <div className="sun-card" aria-hidden="true"><div className="sun-orbit orbit-one"/><div className="sun-orbit orbit-two"/><div className="sun">☀</div><span className="spark spark-one">✦</span><span className="spark spark-two">✦</span></div>
    </section>

    <section className="summary-grid" aria-label="今日概览">
      <article className="progress-card">
        <div className="section-heading"><div><span className="mini-label">TODAY&apos;S PROGRESS</span><h2>今日进度</h2></div><strong>{completed}<small> / {tasks.length}</small></strong></div>
        <div className="progress-track"><span style={{width:`${progress}%`}}/></div>
        <p>{progress===100?"全部完成，真了不起！":`再完成 ${tasks.length-completed} 项，离目标又近一步`}</p>
      </article>
      <article className="focus-card"><span className="focus-icon">◎</span><div><span className="mini-label">FOCUS TIME</span><h2>专注时间</h2><p>今日计划 <strong>3小时10分钟</strong></p></div></article>
      {quoteVisible&&<article className="quote-card"><button onClick={()=>setQuoteVisible(false)} aria-label="关闭鼓励语">×</button><span>“</span><p>不要急着赶路，<br/>花会沿途开放。</p></article>}
    </section>

    <section className="schedule-section">
      <div className="schedule-title"><div><span className="mini-label">TODAY&apos;S PLAN</span><h2>今天要做的事</h2></div>
        <nav className="filters" aria-label="按类型筛选">{(["全部","学习","体育","音乐","阅读"] as const).map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</nav>
      </div>
      <div className="task-list">{visibleTasks.map((task)=><article className={`task-row ${task.done?"is-done":""}`} key={task.id}>
        <div className="time"><strong>{task.time}</strong><span>{task.duration}</span></div><div className={`task-icon ${categoryClass[task.category]}`}>{task.icon}</div>
        <div className="task-copy"><span className={`tag ${categoryClass[task.category]}`}>{task.category}</span><h3>{task.title}</h3><p>{task.detail}</p></div>
        <button className="check" onClick={()=>toggleTask(task.id)} aria-label={`${task.done?"标记为未完成":"完成"}${task.title}`}>{task.done?"✓":""}</button>
      </article>)}</div>
    </section>
    <footer><span>向上学习 · 每一天都值得认真对待</span><span>今日寄语：慢慢来，但不要停。</span></footer>
  </main>;
}
