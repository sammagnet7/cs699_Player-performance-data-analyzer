/**
 * Controller class for handling CSV file operations.
 */
package iitb.cs699.playerStatAnalyser.controller;

/**
 * Import necessary classes for the controller.
 */
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import iitb.cs699.playerStatAnalyser.service.CsvDownloadService;
import iitb.cs699.playerStatAnalyser.service.CsvUploadService;

/**
 * RestController class for managing CSV file operations.
 */
@RestController
@RequestMapping("/csv")
public class CsvController {

    /**
     * Autowired service for CSV file download operations.
     */
    @Autowired
    private CsvDownloadService downloadService;

    /**
     * Autowired service for CSV file upload operations.
     */
    @Autowired
    private CsvUploadService uploadService;

    /**
     * Endpoint to download CSV files as a ZIP archive.
     * @return ResponseEntity with the byte array of the ZIP archive.
     */
    @GetMapping(value="/download", produces="application/zip")
    public ResponseEntity<byte[]> downloadCsvFiles() {
        try {
            List<byte[]> zipFiles = downloadService.downloadCsvFiles();
            return new ResponseEntity<>(zipFiles.get(0), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to upload a CSV file.
     * @param zipFile MultipartFile representing the uploaded ZIP file containing CSV data.
     * @return ResponseEntity with a success or error message.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsv(@RequestParam("csv") MultipartFile zipFile) {
        try {
            // Process the uploaded ZIP file
            uploadService.uploadCsvFiles(zipFile);  // Implement this method in CsvService
            return new ResponseEntity<>("CSV data uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload CSV data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
