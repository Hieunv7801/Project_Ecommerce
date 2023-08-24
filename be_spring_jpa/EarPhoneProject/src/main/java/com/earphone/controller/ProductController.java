package com.earphone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.earphone.model.Products;
import com.earphone.repository.ProductRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/products")
public class ProductController {
	@Autowired
	private ProductRepository productRepository;

	@GetMapping
	public List<Products> getAllProducts() {
		return productRepository.findAll();
	}
	@GetMapping("/page")
	public Page<Products> getAllProductsPage(@PageableDefault(size = 9) Pageable pageable) {
		
		return productRepository.findAll(pageable);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Products> getProductById(@PathVariable int id) {
		Optional<Products> product = productRepository.findById(id);
		if (product.isPresent()) {
			return ResponseEntity.ok(product.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Thêm sản phẩm
	@PostMapping
	public ResponseEntity<Products> addProduct(@ModelAttribute Products product,
			@RequestParam("imageFile") MultipartFile imageFile) throws IOException {
		if (!imageFile.isEmpty()) {
			byte[] bytes = imageFile.getBytes();
			Path path = Paths.get("src/main/resources/" + imageFile.getOriginalFilename());
			Files.write(path, bytes);
			product.setImage(imageFile.getOriginalFilename());
		}

		Products savedProduct = productRepository.save(product);
		return ResponseEntity.ok(savedProduct);
	}

	// update sản phẩm
	@PutMapping("/{id}")
	public ResponseEntity<Products> updateProduct(@PathVariable int id, @ModelAttribute Products product,
			@RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
		Optional<Products> existingProduct = productRepository.findById(id);
		if (existingProduct.isPresent()) {
			Products existingProductData = existingProduct.get();
			existingProductData.setName(product.getName());
			existingProductData.setPrice(product.getPrice());
			existingProductData.setDescription(product.getDescription());

			// Xử lý cập nhật ảnh mới nếu có
			if (imageFile != null && !imageFile.isEmpty()) {
				byte[] bytes = imageFile.getBytes();
				Path path = Paths.get("src/main/resources/" + imageFile.getOriginalFilename());
				Files.write(path, bytes);
				existingProductData.setImage(imageFile.getOriginalFilename());
			}

			Products updatedProduct = productRepository.save(existingProductData);
			System.out.println(updatedProduct.getImage());
			return ResponseEntity.ok(updatedProduct);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// xóa sản phẩm
	@DeleteMapping("/{id}")
	public ResponseEntity<Products> deleteProduct(@PathVariable int id) {
		Optional<Products> existingProduct = productRepository.findById(id);
		if (existingProduct.isPresent()) {
			productRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping(path = "/get-image/{imageName}")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable("imageName") String imageName) {
		if (imageName != null || "".equals(imageName)) {
			Path fileName = Paths.get("src/main/resources", imageName);
			try {
				byte[] buffer = Files.readAllBytes(fileName);
				ByteArrayResource bytes = new ByteArrayResource(buffer);
				return ResponseEntity.ok().contentLength(buffer.length)
						.contentType(MediaType.parseMediaType("image/png")).body(bytes);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.badRequest().build();
	}

	// xóa trong thư mục
	public static void deleteImage(String filename) {
		File file = new File("src/main/resources/" + filename);
		if (file.exists()) {
			file.delete();
		}
	}
}
