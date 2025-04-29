package projetjava.BackendBlackjack.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.dto.RegistrationRequest;
import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;

@Service
public class RegistrationService {

    private final UtilisateurRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegistrationService(UtilisateurRepository userRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void register(RegistrationRequest req) {
        // 1. Vérification mots de passe
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas.");
        }
        // 2. Vérification unicité
        if (userRepo.findByNom(req.getNom()).isPresent()) {
            throw new IllegalArgumentException("Ce nom d’utilisateur existe déjà.");
        }
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Cet email est déjà utilisé.");
        }
        // 3. Création et enregistrement
        Utilisateur user = new Utilisateur();
        user.setNom(req.getNom());
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        userRepo.save(user);
    }
}
