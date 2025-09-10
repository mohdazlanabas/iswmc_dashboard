# Weighbridge System Architecture — Both Options in One Diagram

Below is a single diagram that **draws both architectures side‑by‑side** using Mermaid subgraphs, followed by separate diagrams for each option and a side‑by‑side comparison table.

```mermaid
flowchart LR
  %% Combined view: A and B side-by-side

  subgraph A["A) Direct API Path"]
    A1[Weighbridge System] --> A2[Windows Server]
    A2 --> A3[API Service]
    A3 --> A4[Dashboard (Web/App)]
    A4 --> A5[User]
  end

  subgraph B["B) Cloud Mirror Path"]
    B1[Weighbridge System] --> B2[Windows Server]
    B2 --> B3[Cloud Mirror (Sync/ETL)]
    B3 --> B4[Web Access (Portal/API)]
    B4 --> B5[User]
  end
```

---

## Option A: Direct API Path
```mermaid
flowchart TD
  A1[Weighbridge System] --> A2[Windows Server]
  A2 --> A3[API Service]
  A3 --> A4[Dashboard (Web/App)]
  A4 --> A5[User]
```

### Key Points
- Lower latency with fewer hops.
- Simpler architecture; fewer moving parts.
- Dashboard availability depends directly on Windows Server uptime.
- Suited for on‑premise or single‑site operations.

---

## Option B: Cloud Mirror Path
```mermaid
flowchart TD
  B1[Weighbridge System] --> B2[Windows Server]
  B2 --> B3[Cloud Mirror (Sync/ETL)]
  B3 --> B4[Web Access (Portal/API)]
  B4 --> B5[User]
```

### Key Points
- Adds a cloud mirror for off‑site replication and external access.
- Enables scalability and cross‑site/partner access.
- Possible sync lag depending on CDC/stream vs batch.
- Incremental cloud cost; improved redundancy and analytics options.

---

## Side‑by‑Side Comparison

| Aspect            | Option A: Direct API Path | Option B: Cloud Mirror Path |
|-------------------|---------------------------|-----------------------------|
| **Latency**       | Low, near real‑time       | Small lag (sync dependent)  |
| **Complexity**    | Lower                     | Higher (sync + cloud infra) |
| **Availability**  | Tied to on‑prem server    | Cloud improves availability |
| **Scalability**   | Limited to server         | Elastic cloud scaling       |
| **Cost (OPEX)**   | Lower                     | Higher (cloud services)     |
| **Best For**      | Local, single‑site ops    | Multi‑site/partner access, analytics |

---

## Notes
- Secure both paths with TLS, authN/authZ, and audit logging.
- Plan for back‑pressure/queueing and offline buffering at the edge.
- Define canonical IDs and timestamping for tickets/axle weights; for B, specify CDC vs push API vs file drop and conflict resolution rules.
