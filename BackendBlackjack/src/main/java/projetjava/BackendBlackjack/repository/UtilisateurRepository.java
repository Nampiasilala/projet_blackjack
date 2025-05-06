package projetjava.BackendBlackjack.repository;

import projetjava.BackendBlackjack.model.Utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateurs, Long> {
    Optional<Utilisateurs> findByEmail(String email);
    boolean existsByEmail(String email);
}