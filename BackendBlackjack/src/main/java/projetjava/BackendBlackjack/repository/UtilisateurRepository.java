package projetjava.BackendBlackjack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
