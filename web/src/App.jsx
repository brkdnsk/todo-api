import { useEffect, useState } from "react";

function App() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newTodo, setNewTodo] = useState("");

	// 1. Verileri backend'den çekme (GET)
	const fetchTodos = () => {
		fetch("http://localhost:8080/api/todos")
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Veri çekerken hata oluştu:", error);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	// 2. Backend'e yeni görev gönderme (POST)
	const handleAddTodo = (e) => {
		e.preventDefault();
		if (!newTodo.trim()) return;

		fetch("http://localhost:8080/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: newTodo, completed: false }), // Backend'deki değişken adın farklıysa (örn: task) burayı ona göre ayarlayabilirsin
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos([...todos, data]); // Listeye yeni eklenen todoyu anında dahil et
				setNewTodo(""); // Input kutusunu temizle
			})
			.catch((error) => console.error("Todo eklenirken hata:", error));
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
			<h1 className="text-4xl font-bold mb-6 text-emerald-400">
				Todo List Uygulaması 🚀
			</h1>

			<div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
				<h2 className="text-xl font-semibold mb-4 text-slate-200">
					Yapılacaklar Listesi
				</h2>

				{/* Yeni Todo Ekleme Formu */}
				<form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="Yeni bir görev yaz..."
						className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl focus:outline-none focus:border-emerald-400 text-white placeholder-slate-400"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition-all"
					>
						Ekle
					</button>
				</form>

				{loading ? (
					<p className="text-slate-400 text-center">Yükleniyor...</p>
				) : todos.length === 0 ? (
					<p className="text-slate-400 text-center">
						Henüz eklenmiş bir todo yok.
					</p>
				) : (
					<ul className="space-y-3">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="p-3 bg-slate-700/50 rounded-xl border border-slate-600 flex justify-between items-center"
							>
								<span>{todo.title || todo.title}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
