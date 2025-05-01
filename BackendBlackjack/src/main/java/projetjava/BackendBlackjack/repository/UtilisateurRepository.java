package projetjava.BackendBlackjack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.Utilisateur;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
}
