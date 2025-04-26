package projetjava.BackendBlackjack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "statistiques_jeu")
public class StatistiquesJeu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "utilisateur_id", nullable = false)
    private Long utilisateurId;

    @Column(name = "parties_jouees")
    private int partiesJouees;

    @Column(name = "parties_gagnees")
    private int partiesGagnees;

    @Column(name = "parties_perdues")
    private int partiesPerdues;

    @Column(name = "jetons_gagnes")
    private int jetonsGagnes;

    @Column(name = "meilleure_serie_victoires")
    private int meilleureSerieVictoires;

    // ====== Getters et Setters ======

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public int getPartiesJouees() {
        return partiesJouees;
    }

    public void setPartiesJouees(int partiesJouees) {
        this.partiesJouees = partiesJouees;
    }

    public int getPartiesGagnees() {
        return partiesGagnees;
    }

    public void setPartiesGagnees(int partiesGagnees) {
        this.partiesGagnees = partiesGagnees;
    }

    public int getPartiesPerdues() {
        return partiesPerdues;
    }

    public void setPartiesPerdues(int partiesPerdues) {
        this.partiesPerdues = partiesPerdues;
    }

    public int getJetonsGagnes() {
        return jetonsGagnes;
    }

    public void setJetonsGagnes(int jetonsGagnes) {
        this.jetonsGagnes = jetonsGagnes;
    }

    public int getMeilleureSerieVictoires() {
        return meilleureSerieVictoires;
    }

    public void setMeilleureSerieVictoires(int meilleureSerieVictoires) {
        this.meilleureSerieVictoires = meilleureSerieVictoires;
    }
}
