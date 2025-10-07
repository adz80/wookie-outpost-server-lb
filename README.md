# Wookiee Outpost Comms

[cloudflarebutton]

A visually striking single-page web application designed to demonstrate server load balancing through a retro, Star Wars-inspired 'Wookiee Outpost' theme. The application's core purpose is to make a client-side API call to a relative `/api` endpoint and display the name of the server that responded. This simulates a user's request being routed by a load balancer to one of several available server instances.

The UI is heavily themed, featuring a retro-futuristic console aesthetic with pixelated fonts, glitchy text effects, and a color palette reminiscent of Chewbacca's fur and bandolier. A central 'comms panel' displays the responding server's identifier, which can be manually refreshed via a tactile, console-style button. The project is built as a single, self-contained React component within the provided Cloudflare Workers template, emphasizing visual polish and a delightful, nostalgic user experience.

## Key Features

-   **Retro Sci-Fi Theme:** A unique "Wookiee Outpost" interface inspired by classic Star Wars consoles.
-   **Load Balancing Demo:** Visually demonstrates which server instance is responding to a client-side request.
-   **Single-Page Application:** All functionality is contained within a single, fast-loading page.
-   **Interactive UI:** Features a manual "Refresh Signal" button and dynamic text effects for loading, success, and error states.
-   **Responsive Design:** A clean, centered layout that works seamlessly on desktop and mobile devices.
-   **Cloudflare Powered:** Built on a robust stack using Vite for the frontend and a Hono-based Cloudflare Worker for the API.

## Technology Stack

-   **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Framer Motion
-   **Backend:** Cloudflare Workers, Hono
-   **Language:** TypeScript
-   **Package Manager:** Bun

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/wookiee-outpost-comms.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd wookiee-outpost-comms
    ```

3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the application locally, which starts both the Vite development server for the frontend and a local Wrangler instance for the worker backend, use the following command:

```sh
bun run dev
```

This will open the application in your default browser, typically at `http://localhost:3000`. The frontend will have access to the API running locally.

## Deployment

This project is configured for easy deployment to Cloudflare Pages.

1.  **Login to Wrangler:**
    If this is your first time deploying, you may need to authenticate Wrangler with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which builds the application and deploys it using Wrangler.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]