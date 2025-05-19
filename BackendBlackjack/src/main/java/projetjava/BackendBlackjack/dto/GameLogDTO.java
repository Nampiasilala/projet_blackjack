package projetjava.BackendBlackjack.dto;

import java.time.LocalDateTime;

public class GameLogDTO {
    private Double mise;
    private Double gain;
    private String resultat;
    private Double balanceApres;
    private LocalDateTime datePartie;

    public GameLogDTO(Double mise, Double gain, String resultat, Double balanceApres, LocalDateTime datePartie) {
        this.mise = mise;
        this.gain = gain;
        this.resultat = resultat;
        this.balanceApres = balanceApres;
        this.datePartie = datePartie;
    }

    // Getters seulement (pas besoin de setters si immuable)
    public Double getMise() { return mise; }
    public Double getGain() { return gain; }
    public String getResultat() { return resultat; }
    public Double getBalanceApres() { return balanceApres; }
    public LocalDateTime getDatePartie() { return datePartie; }
}
