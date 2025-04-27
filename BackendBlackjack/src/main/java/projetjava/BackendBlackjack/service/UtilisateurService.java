package projetjava.BackendBlackjack.service;

import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // Méthode pour ajouter un utilisateur
    public Utilisateur ajouterUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    // 🆕 Méthode pour récupérer un utilisateur par ID
    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id: " + id));
    }
}
