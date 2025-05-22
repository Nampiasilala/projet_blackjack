package projetjava.BackendBlackjack.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import projetjava.BackendBlackjack.repository.StatistiquesJeuRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UtilisateursService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private StatistiquesJeuRepository statistiquesJeuRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Utilisateurs ajouterUtilisateur(UserCreationDTO dto) {
        Utilisateurs utilisateur = new Utilisateurs();
        utilisateur.setNom(dto.getNom());
        utilisateur.setEmail(dto.getEmail());

        String passwordHash = passwordEncoder.encode(dto.getPassword());
        utilisateur.setPasswordHash(passwordHash);

        Utilisateurs utilisateurCree = utilisateurRepository.save(utilisateur);

        StatistiquesJeu stats = new StatistiquesJeu();
        stats.setUtilisateur(utilisateurCree);
        stats.setPartiesJouees(0);
        stats.setPartiesGagnees(0);
        stats.setPartiesPerdues(0);
        stats.setJetonsGagnes(0);
        stats.setMeilleureSerieVictoires(0);
        statistiquesJeuRepository.save(stats);

        System.out.println("Statistiques sauvegardées : " + stats);

        return utilisateurCree;
    }

    public Utilisateurs getUtilisateurById(Long id) {
        Optional<Utilisateurs> utilisateur = utilisateurRepository.findById(id);
        return utilisateur.orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
    }

    public List<Utilisateurs> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Transactional
    public Utilisateurs updateUserBalance(Long id, Double newBalance) {
        Utilisateurs utilisateur = getUtilisateurById(id);
        utilisateur.setBalance(newBalance);
        return utilisateurRepository.save(utilisateur);
    }

    public void supprimerUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + id);
        }
        utilisateurRepository.deleteById(id);
    }
}
