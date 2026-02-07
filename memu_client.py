import requests
import os
from typing import Dict, List, Any, Optional

class MemUClient:
    """
    Client for interacting with the MemU server.
    Implements the 3-layer memory structure:
    1. Store (Writing to resource layer)
    2. Evolve (Server-side processing)
    3. Retrieve (LLM-based search)
    """
    
    def __init__(self, base_url: str = None, user_id: str = "default_user"):
        """
        Initialize the MemU Client.
        :param base_url: URL of the memU server. Defaults to env var MEMU_API_URL or local.
        :param user_id: ID of the current user.
        """
        if base_url is None:
            # Check environment variable first, then fallback to local
            base_url = os.getenv("MEMU_API_URL", "http://localhost:8000")
            
        self.base_url = base_url.rstrip('/')
        self.user_id = user_id
        
    def store(self, content: str, resource_type: str = "text") -> Dict[str, Any]:
        """
        Store: Write conversation or logs to the resource layer.
        """
        url = f"{self.base_url}/resources/"
        payload = {
            "user_id": self.user_id,
            "content": content,
            "resource_type": resource_type
        }
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error storing memory: {e}")
            return {"status": "error", "message": str(e)}

    def retrieve(self, query: str) -> List[Dict[str, Any]]:
        """
        Retrieve: Search for relevant memories using the query.
        """
        url = f"{self.base_url}/search/deep"
        params = {
            "user_id": self.user_id,
            "query": query
        }
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            # Extract items from the result structure
            # Structure seems to be: {"results": {"items": [...]}} based on server code
            results = data.get("results", {})
            if isinstance(results, dict):
                return results.get("items", [])
            return []
        except requests.RequestException as e:
            print(f"Error retrieving memory: {e}")
            return []

    def chat(self, message: str) -> str:
        """
        Chat: interact with the agent which uses memory context.
        """
        url = f"{self.base_url}/chat"
        payload = {
            "user_id": self.user_id,
            "message": message
        }
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            return response.json().get("reply", "")
        except requests.RequestException as e:
            print(f"Error chatting: {e}")
            return f"Error: {e}"

# Usage Example
if __name__ == "__main__":
    client = MemUClient(user_id="hackathon_user_1")
    
    # 1. Store some preferences (The "Store" step)
    print("Storing memories...")
    client.store("User prefers dark mode in the application.")
    client.store("User likes to use Python for backend development.")
    client.store("User is working on a hackathon project called 'Trae-MemU'.")
    
    # 2. Retrieve relevant memory (The "Retrieve" step)
    print("\nRetrieving memories about preferences...")
    memories = client.retrieve("What are the user's development preferences?")
    for mem in memories:
        print(f"- Found: {mem.get('content')}")
        
    # 3. Chat (Integration test)
    print("\nChatting with context...")
    reply = client.chat("What should I use for the backend of my hackathon project?")
    print(f"Assistant: {reply}")
