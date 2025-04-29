package projetjava.BackendBlackjack.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByNom(String nom);
    Optional<Utilisateur> findByEmail(String email);
}
