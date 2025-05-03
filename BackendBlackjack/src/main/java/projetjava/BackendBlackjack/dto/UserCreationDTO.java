package projetjava.BackendBlackjack.dto;

import jakarta.validation.constraints.*;

public class UserCreationDTO {
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    private String email;
    
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;

    // Getters
    public String getNom() { return nom; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }

    // Setters
    public void setNom(String nom) { this.nom = nom; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
}