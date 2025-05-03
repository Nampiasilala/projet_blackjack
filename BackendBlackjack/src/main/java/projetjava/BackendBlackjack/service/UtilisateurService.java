package projetjava.BackendBlackjack.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.exception.EmailAlreadyExistsException;
import projetjava.BackendBlackjack.exception.NotFoundException;
import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public Utilisateur ajouterUtilisateur(UserCreationDTO userDTO) {
        if(utilisateurRepository.existsByEmail(userDTO.getEmail())) {
            throw new EmailAlreadyExistsException("L'email est déjà utilisé");
        }

        Utilisateur nouvelUtilisateur = new Utilisateur();
        nouvelUtilisateur.setNom(userDTO.getNom());
        nouvelUtilisateur.setEmail(userDTO.getEmail());
        nouvelUtilisateur.setPasswordHash(BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt()));

        return utilisateurRepository.save(nouvelUtilisateur);
    }

    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Utilisateur non trouvé avec l'ID : " + id));
    }
}