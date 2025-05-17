package projetjava.BackendBlackjack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_logs")
public class GameLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Utilisateurs utilisateur;

    @Column(nullable = false)
    private Double mise;

    @Column(nullable = false)
    private Double gain;

    @Column(length = 20)
    private String resultat; // 'win', 'lose', 'draw'

    @Column(name = "balance_apres", nullable = false)
    private Double balanceApres;

    @Column(name = "date_partie")
    private LocalDateTime datePartie = LocalDateTime.now();

    // getters et setters

    public Long getId() { return id; }
    public Utilisateurs getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateurs utilisateur) { this.utilisateur = utilisateur; }
    public Double getMise() { return mise; }
    public void setMise(Double mise) { this.mise = mise; }
    public Double getGain() { return gain; }
    public void setGain(Double gain) { this.gain = gain; }
    public String getResultat() { return resultat; }
    public void setResultat(String resultat) { this.resultat = resultat; }
    public Double getBalanceApres() { return balanceApres; }
    public void setBalanceApres(Double balanceApres) { this.balanceApres = balanceApres; }
    public LocalDateTime getDatePartie() { return datePartie; }
    public void setDatePartie(LocalDateTime datePartie) { this.datePartie = datePartie; }
}
