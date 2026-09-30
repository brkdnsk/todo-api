import { useEffect, useState } from "react";

function App() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);

	// Sayfa ilk yüklendiğinde backend'den verileri çeken fonksiyon
	useEffect(() => {
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
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
			<h1 className="text-4xl font-bold mb-6 text-emerald-400">
				Todo List Uygulaması 🚀
			</h1>

			<div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
				<h2 className="text-xl font-semibold mb-4 text-slate-200">
					Yapılacaklar Listesi
				</h2>

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
								<span>{todo.title || todo.task}</span>{" "}
								{/* Backend'deki alan adına göre değişebilir */}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
