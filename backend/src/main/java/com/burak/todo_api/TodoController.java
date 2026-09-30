package com.burak.todo_api;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoRepository todoRepository;

    // Dependency Injection: Spring, depocuyu buraya otomatik olarak getirip teslim eder.
    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // GET /todos -> Veritabanındaki tüm görevleri listeler
    @GetMapping
    public List<Todo> getAllTodos() {
        // Artık sahte liste yok, doğrudan PostgreSQL tablosundan çekiyoruz!
        return todoRepository.findAll();
    }

    // POST /todos -> Dışarıdan gelen görevi veritabanına kalıcı olarak kaydeder
    @PostMapping
    public Todo createTodo(@Valid @RequestBody Todo newTodo) {
        // Veritabanına kaydet ve kaydedilen nesneyi (ID'si oluşmuş şekilde) geri döndür
        return todoRepository.save(newTodo);
    }

    // 3. GET /todos/{id} -> Sadece belirli bir ID'ye sahip olannları getirir.
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    // 4. PUT /todos/{id} -> Var olan bir görevi güncelle
    @PutMapping("/{id}")
    public Todo updateTodo(@Valid @PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    // Kayıt varsa alanlarını güncelle ve kaydet
                    existingTodo.setTitle(updatedTodo.getTitle());
                    existingTodo.setCompleted(updatedTodo.isCompleted());
                    return todoRepository.save(existingTodo);
                })
                .orElseThrow(() -> new RuntimeException("Güncellenmek istenen ID bulunamadı: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }

}