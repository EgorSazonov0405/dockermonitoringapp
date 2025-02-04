package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type container struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	IP     string `json:"ip"`
	Status string `json:"status"`
}

var containers = []container{
	{ID: "1", Name: "1", IP: "192.168.0.1", Status: "running"},
	{ID: "2", Name: "2", IP: "192.168.0.2", Status: "running"},
	{ID: "3", Name: "3", IP: "192.168.0.3", Status: "running"},
	{ID: "4", Name: "4", IP: "192.168.0.4", Status: "running"},
	{ID: "5", Name: "5", IP: "192.168.0.5", Status: "running"},
	{ID: "6", Name: "6", IP: "192.168.0.6", Status: "running"},
}

func getContainers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, containers)
}

func main() {
	router := gin.Default()

	// Включаем CORS middleware
	router.Use(cors.Default())

	router.GET("/containers", getContainers)

	router.Run("localhost:8080")
}
