package iitb.cs699.playerStatAnalyser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cars")
public class CarsController {
	
	@Autowired
	private CarRepository carRepository;
	
	@GetMapping
    public List<Cars> findAll() {
		
        return carRepository.findAll();
    }

}
