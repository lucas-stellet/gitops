package main

import (
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", Home)
	http.ListenAndServe(":3000", nil)
}

// Home ...
func Home(w http.ResponseWriter, r *http.Request) {
	name := os.Getenv("MY_NAME")
	w.Write([]byte("<h1>Hello " + name + " from a Golang server! 18/01/2021 at 17hrs </h1>"))
}
