<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
    Trash2,
    Plus,
    CheckCircle2,
    Calendar,
    Zap,
    Sparkles,
} from "lucide-vue-next";

interface Task {
    id: number;
    title: string;
    description?: string;
    createdAt: string;
    completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTitle = ref("");
const newDescription = ref("");
const isSubmitting = ref(false);

const addTask = async () => {
    if (!newTitle.value.trim() || isSubmitting.value) return;

    isSubmitting.value = true;

    const task: Task = {
        id: Date.now(),
        title: newTitle.value,
        description: newDescription.value,
        createdAt: new Date().toISOString(),
        completed: false,
    };

    tasks.value.unshift(task);
    newTitle.value = "";
    newDescription.value = "";

    setTimeout(() => (isSubmitting.value = false), 280);
};

const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
};

const toggleTask = (id: number) => {
    tasks.value = tasks.value.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") addTask();
};

onMounted(() => { });
</script>

<template>
    <div class="app-root">
        <!-- Ambient background -->
        <div class="bg-layer">
            <span class="blob purple" />
            <span class="blob indigo" />
            <span class="blob pink" />
        </div>

        <main class="container">
            <!-- Header -->
            <header class="header">
                <div class="title-wrap">
                    <div class="logo">🚀</div>
                    <div>
                        <h1>Task Intelligence</h1>
                        <p>Desktop productivity reimagined</p>
                    </div>
                </div>

                <div class="stat">
                    <Sparkles :size="16" />
                    <span>{{ tasks.length }} task</span>
                </div>
            </header>

            <!-- Input -->
            <section class="composer card">
                <input v-model="newTitle" @keydown="handleKeyDown" placeholder="What are you planning?" />

                <textarea v-model="newDescription" @keydown="handleKeyDown" placeholder="Optional details..."
                    rows="3" />

                <div class="composer-footer">
                    <div class="hint">
                        <Zap :size="14" />
                        Ctrl + Enter
                    </div>

                    <button class="btn-primary" :disabled="!newTitle.trim() || isSubmitting" @click="addTask">
                        <Plus :size="16" />
                        {{ isSubmitting ? "Saving..." : "Add Task" }}
                    </button>
                </div>
            </section>

            <!-- Empty -->
            <div v-if="tasks.length === 0" class="empty">
                <div class="emoji">📂</div>
                <p>No tasks yet</p>
                <span>Start by adding a new one</span>
            </div>

            <!-- Tasks -->
            <TransitionGroup name="task" tag="section" class="tasks">
                <article v-for="task in tasks" :key="task.id" class="task card" :class="{ done: task.completed }"
                    @click="toggleTask(task.id)">
                    <CheckCircle2 class="check" />

                    <div class="content">
                        <h3>{{ task.title }}</h3>
                        <p v-if="task.description">{{ task.description }}</p>

                        <div class="meta">
                            <Calendar :size='12' />
                            {{ new Date(task.createdAt).toLocaleDateString() }}
                        </div>
                    </div>

                    <button class="delete" @click.stop="deleteTask(task.id)">
                        <Trash2 :size='16' />
                    </button>
                </article>
            </TransitionGroup>
        </main>
    </div>
</template>

<style scoped>
/* ================= Root ================= */
.app-root {
    min-height: 100vh;
    background: radial-gradient(circle at top,
            #1e1b4b,
            #020617 60%);
    color: #e5e7eb;
    font-family: Inter, system-ui, sans-serif;
    overflow: hidden;
}

/* ================= Background ================= */
.bg-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
}

.blob {
    position: absolute;
    width: 420px;
    height: 420px;
    filter: blur(120px);
    opacity: 0.25;
    animation: float 14s infinite ease-in-out;
}

.blob.purple {
    background: #a855f7;
    top: -10%;
    left: -10%;
}

.blob.indigo {
    background: #6366f1;
    bottom: -15%;
    right: 20%;
    animation-delay: 4s;
}

.blob.pink {
    background: #ec4899;
    top: 40%;
    left: 30%;
    animation-delay: 8s;
}

/* ================= Layout ================= */
.container {
    position: relative;
    z-index: 2;
    max-width: 880px;
    margin: auto;
    padding: 48px 24px;
}

/* ================= Header ================= */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
}

.title-wrap {
    display: flex;
    gap: 16px;
    align-items: center;
}

.logo {
    font-size: 40px;
    animation: float 3s ease-in-out infinite;
}

.header h1 {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(90deg, #ddd6fe, #c7d2fe);
    -webkit-background-clip: text;
    color: transparent;
}

.header p {
    font-size: 13px;
    color: #a5b4fc;
}

.stat {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
}

/* ================= Card ================= */
.card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 20px;
    backdrop-filter: blur(18px);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.4s ease,
        border-color 0.3s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55),
        0 0 0 1px rgba(139, 92, 246, 0.5);
}

/* ================= Composer ================= */
.composer {
    padding: 28px;
    margin-bottom: 32px;
}

.composer input,
.composer textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 18px;
    margin-bottom: 16px;
}

.composer textarea {
    resize: none;
    font-size: 14px;
    color: #c7d2fe;
}

.composer-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hint {
    display: flex;
    gap: 6px;
    font-size: 12px;
    color: #a5b4fc;
}

.btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 12px;
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 24px rgba(139, 92, 246, 0.6);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* ================= Tasks ================= */
.tasks {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.task {
    display: flex;
    gap: 16px;
    padding: 20px;
    cursor: pointer;
}

.task.done {
    opacity: 0.55;
}

.check {
    color: #6366f1;
    flex-shrink: 0;
}

.task h3 {
    font-size: 16px;
    font-weight: 600;
}

.task.done h3 {
    text-decoration: line-through;
}

.task p {
    font-size: 14px;
    color: #c7d2fe;
}

.meta {
    margin-top: 10px;
    font-size: 12px;
    color: #94a3b8;
    display: flex;
    gap: 6px;
    align-items: center;
}

.delete {
    margin-left: auto;
    opacity: 0;
    background: transparent;
    border: none;
    color: #f87171;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.task:hover .delete {
    opacity: 1;
}

.delete:hover {
    transform: scale(1.2);
}

/* ================= Empty ================= */
.empty {
    text-align: center;
    margin-top: 80px;
    opacity: 0.6;
}

.empty .emoji {
    font-size: 64px;
    margin-bottom: 16px;
}

/* ================= Animations ================= */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-14px);
    }
}

.task-enter-active,
.task-leave-active {
    transition: all 0.35s ease;
}

.task-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.task-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
