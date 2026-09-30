package com.burak.todo_api;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Hiçbir SQL kodu yazmadan, Spring bizim için veritabanına ekleme, silme, listeleme metotlarını buraya otomatik getirecek!
}