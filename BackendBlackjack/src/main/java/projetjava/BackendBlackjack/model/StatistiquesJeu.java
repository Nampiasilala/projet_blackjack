package projetjava.BackendBlackjack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "statistiques_jeu")
public class StatistiquesJeu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateurs utilisateur;

    @Column(name = "parties_jouees")
    private int partiesJouees = 0;

    @Column(name = "parties_gagnees")
    private int partiesGagnees = 0;

    @Column(name = "parties_perdues")
    private int partiesPerdues = 0;

    @Column(name = "jetons_gagnes")
    private int jetonsGagnes = 0;

    @Column(name = "jetons_perdus")
    private int jetonsPerdus = 0;

    @Column(name = "meilleure_serie_victoires")
    private int meilleureSerieVictoires = 0;

    // ====== Getters et Setters ======

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateurs getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateurs utilisateur) {
        this.utilisateur = utilisateur;
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

    public int getJetonsPerdus() {
        return jetonsPerdus;
    }

    public void setJetonsPerdus(int jetonsPerdus) {
        this.jetonsPerdus = jetonsPerdus;
    }

    public int getMeilleureSerieVictoires() {
        return meilleureSerieVictoires;
    }

    public void setMeilleureSerieVictoires(int meilleureSerieVictoires) {
        this.meilleureSerieVictoires = meilleureSerieVictoires;
    }
}
