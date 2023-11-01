package iitb.cs699.playerStatAnalyser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/batsman")
public class BatsmanController {
	
	@Autowired
	private VsCountryBatsmanRepository vs_country_batsmanRepository;
	
	@GetMapping
    public List<VsCountryBatsman> findAll() {
        return vs_country_batsmanRepository.findAll();
    }

}
