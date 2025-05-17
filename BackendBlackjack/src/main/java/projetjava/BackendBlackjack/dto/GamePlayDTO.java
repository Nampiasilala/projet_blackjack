package projetjava.BackendBlackjack.dto;

public class GamePlayDTO {
    private Long userId;
    private Double mise;
    private Double gain;
    private String resultat;

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Double getMise() { return mise; }
    public void setMise(Double mise) { this.mise = mise; }

    public Double getGain() { return gain; }
    public void setGain(Double gain) { this.gain = gain; }

    public String getResultat() { return resultat; }
    public void setResultat(String resultat) { this.resultat = resultat; }
}
