package projetjava.BackendBlackjack.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "utilisateurs")
public class Utilisateurs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Email invalide")
    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password_hash")
    private String passwordHash;

    @Column(nullable = false)
    private Double balance = 1000.0;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<GameLog> gameLogs = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<StatistiquesJeu> statistiques = new ArrayList<>();

    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public Double getBalance() { return balance; }
    public List<GameLog> getGameLogs() { return gameLogs; }
    public List<StatistiquesJeu> getStatistiques() { return statistiques; }

    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setBalance(Double balance) { this.balance = balance; }
    public void setGameLogs(List<GameLog> gameLogs) { this.gameLogs = gameLogs; }
    public void setStatistiques(List<StatistiquesJeu> statistiques) { this.statistiques = statistiques; }
}
