package com.todo.todoserver.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user", uniqueConstraints = {
        @UniqueConstraint(name = "auth_id_unique", columnNames = "authId")
})
public class User {
  @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
  private Long id; 
  private String authId;
  private String username;
  private String email;
  private String profilePicture;
  public User(String username, String email, String profilePicture, String authId) {
    this.username = username;
    this.email = email;
    this.profilePicture = profilePicture;
    this.authId = authId;
  }

}
