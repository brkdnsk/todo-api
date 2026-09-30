package com.burak.todo_api;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;



@Entity // Bu sınıfın bir veritabanı tablosu olacağını söyler
@Table(name = "todos") // Veritabanında tablonun adının 'todos' olacağını belirtir
public class Todo {

    @Id // Bu alanın tablonun eşsiz kimliği (Primary Key) olduğunu söyler
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID'nin 1, 2, 3 diye otomatik 1'er 1'er artmasını sağlar
    private Long id;

    @NotBlank(message = "Görev başlığı boş olamaz!")
    private String title;

    private Boolean completed;

    // Hibernate (JPA) için boş bir kurucu metot (Constructor) şarttır
    public Todo() {
    }

    public Todo(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    // Getter ve Setter metotları (Aynen kalıyor)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}