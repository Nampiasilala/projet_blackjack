package projetjava.BackendBlackjack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import projetjava.BackendBlackjack.repository.StatistiquesJeuRepository;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Pour le hachage du mot de passe

@Service
public class UtilisateursService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private StatistiquesJeuRepository statistiquesJeuRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Utilisation de BCryptPasswordEncoder pour hacher le mot de passe

    public Utilisateurs ajouterUtilisateur(UserCreationDTO dto) {
        Utilisateurs utilisateur = new Utilisateurs();
        utilisateur.setNom(dto.getNom());
        utilisateur.setEmail(dto.getEmail());

        // Hachage du mot de passe avant de le stocker
        String passwordHash = passwordEncoder.encode(dto.getPassword());
        utilisateur.setPasswordHash(passwordHash);

        Utilisateurs utilisateurCree = utilisateurRepository.save(utilisateur);

        // Créer des statistiques initiales
        StatistiquesJeu stats = new StatistiquesJeu();
        stats.setUtilisateur(utilisateurCree);
        stats.setPartiesJouees(0);
        stats.setPartiesGagnees(0);
        stats.setPartiesPerdues(0);
        stats.setJetonsGagnes(0);
        stats.setMeilleureSerieVictoires(0);
        statistiquesJeuRepository.save(stats);

        // Log pour vérifier si les statistiques sont bien sauvegardées
        System.out.println("Statistiques sauvegardées : " + stats);

        return utilisateurCree;
    }

    public Utilisateurs getUtilisateurById(Long id) {
        Optional<Utilisateurs> utilisateur = utilisateurRepository.findById(id);
        return utilisateur.orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
    }
}
