package projetjava.BackendBlackjack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String playerName;
    private double betAmount;

    // Constructeur par défaut (OBLIGATOIRE)
    public GameSession() {}

    // Constructeur avec paramètres
    public GameSession(String playerName, double betAmount) {
        this.playerName = playerName;
        this.betAmount = betAmount;
    }

    // Getters et Setters (OBLIGATOIRES)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    public double getBetAmount() { return betAmount; }
    public void setBetAmount(double betAmount) { this.betAmount = betAmount; }
}