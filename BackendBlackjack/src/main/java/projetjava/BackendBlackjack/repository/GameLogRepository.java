package projetjava.BackendBlackjack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.GameLog;

public interface GameLogRepository extends JpaRepository<GameLog, Long> {
}
