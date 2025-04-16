package projetjava.BackendBlackjack;

import org.springframework.boot.SpringApplication;

public class TestBackendBlackjackApplication {

	public static void main(String[] args) {
		SpringApplication.from(BackendBlackjackApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
