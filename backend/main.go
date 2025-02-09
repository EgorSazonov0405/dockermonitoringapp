package main

import (
	"encoding/json"
	"github.com/rs/cors"
	"net/http"
	"os/exec"
	"sync"
)

type PingRequest struct {
	IP   string `json:"ip"`
	Time int    `json:"time"`
}

type PingResponse struct {
	IP     string `json:"ip"`
	Status string `json:"status"`
}

func ping(ip string) (string, error) {
	cmd := exec.Command("ping", "-c", "1", ip) // Для Windows используйте "ping", "-n", "1"
	err := cmd.Run()
	if err != nil {
		return "error", err
	}
	return "ok", nil
}

func pingHandler(w http.ResponseWriter, r *http.Request) {
	var requests []PingRequest
	if err := json.NewDecoder(r.Body).Decode(&requests); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var wg sync.WaitGroup
	responses := make([]PingResponse, len(requests))

	for i, request := range requests {
		wg.Add(1)
		go func(i int, req PingRequest) {
			defer wg.Done()
			status, _ := ping(req.IP)
			responses[i] = PingResponse{IP: req.IP, Status: status}
		}(i, request)
	}

	wg.Wait()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/ping", pingHandler)

	// Настройка CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Замените на ваш фронтенд
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
	})

	handler := c.Handler(mux)
	http.ListenAndServe(":8080", handler)
}
