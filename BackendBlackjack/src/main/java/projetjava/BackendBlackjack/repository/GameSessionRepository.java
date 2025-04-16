package projetjava.BackendBlackjack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.GameSession;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
}