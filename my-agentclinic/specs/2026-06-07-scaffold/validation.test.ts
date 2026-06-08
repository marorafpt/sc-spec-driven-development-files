import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { ailments, therapies, agents, appointments } from "../../lib/data";

const root = process.cwd();

// ---------------------------------------------------------------------------
// 1. Required files exist
// ---------------------------------------------------------------------------

describe("required files exist", () => {
  const files = [
    "tsconfig.json",
    "next.config.ts",
    "postcss.config.js",
    "app/layout.tsx",
    "app/globals.css",
    "app/page.tsx",
    "app/(portal)/ailments/page.tsx",
    "app/(portal)/ailments/[id]/page.tsx",
    "app/(portal)/therapies/page.tsx",
    "app/(portal)/therapies/[id]/page.tsx",
    "app/(portal)/appointments/page.tsx",
    "app/(portal)/appointments/new/page.tsx",
    "app/dashboard/page.tsx",
    "lib/types.ts",
    "lib/data.ts",
    "components/layout/Header.tsx",
    "components/layout/Main.tsx",
    "components/layout/Footer.tsx",
    "components/layout/MainLayout.tsx",
    "components/layout/layout.css",
  ];

  for (const file of files) {
    it(file, () => {
      expect(existsSync(resolve(root, file))).toBe(true);
    });
  }
});

// ---------------------------------------------------------------------------
// 2. Config correctness
// ---------------------------------------------------------------------------

describe("tsconfig", () => {
  it("strict mode is enabled", () => {
    const raw = readFileSync(resolve(root, "tsconfig.json"), "utf-8");
    const tsconfig = JSON.parse(raw);
    expect(tsconfig.compilerOptions?.strict).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 3. Seed data — counts (3–5 items each)
// ---------------------------------------------------------------------------

describe("seed data counts", () => {
  it("ailments has 3–5 items", () => {
    expect(ailments.length).toBeGreaterThanOrEqual(3);
    expect(ailments.length).toBeLessThanOrEqual(5);
  });
  it("therapies has 3–5 items", () => {
    expect(therapies.length).toBeGreaterThanOrEqual(3);
    expect(therapies.length).toBeLessThanOrEqual(5);
  });
  it("agents has 3–5 items", () => {
    expect(agents.length).toBeGreaterThanOrEqual(3);
    expect(agents.length).toBeLessThanOrEqual(5);
  });
  it("appointments has 3–5 items", () => {
    expect(appointments.length).toBeGreaterThanOrEqual(3);
    expect(appointments.length).toBeLessThanOrEqual(5);
  });
});

// ---------------------------------------------------------------------------
// 4. Seed data — shape matches domain interfaces
// ---------------------------------------------------------------------------

describe("Ailment shape", () => {
  for (const a of ailments) {
    it(`${a.id}`, () => {
      expect(typeof a.id).toBe("string");
      expect(typeof a.name).toBe("string");
      expect(["mild", "moderate", "severe"]).toContain(a.severity);
      expect(typeof a.shortDescription).toBe("string");
      expect(typeof a.description).toBe("string");
      expect(Array.isArray(a.therapyIds)).toBe(true);
    });
  }
});

describe("Therapy shape", () => {
  for (const t of therapies) {
    it(`${t.id}`, () => {
      expect(typeof t.id).toBe("string");
      expect(typeof t.name).toBe("string");
      expect(typeof t.durationMinutes).toBe("number");
      expect(t.durationMinutes).toBeGreaterThan(0);
      expect(typeof t.description).toBe("string");
      expect(Array.isArray(t.ailmentIds)).toBe(true);
    });
  }
});

describe("Agent shape", () => {
  for (const a of agents) {
    it(`${a.id}`, () => {
      expect(typeof a.id).toBe("string");
      expect(typeof a.name).toBe("string");
      expect(typeof a.species).toBe("string");
      expect(typeof a.operatorHandle).toBe("string");
    });
  }
});

describe("Appointment shape", () => {
  for (const appt of appointments) {
    it(`${appt.id}`, () => {
      expect(typeof appt.id).toBe("string");
      expect(typeof appt.agentId).toBe("string");
      expect(typeof appt.therapyId).toBe("string");
      expect(typeof appt.date).toBe("string");
      expect(["upcoming", "completed", "cancelled"]).toContain(appt.status);
    });
  }
});

// ---------------------------------------------------------------------------
// 5. Referential integrity
// ---------------------------------------------------------------------------

describe("referential integrity", () => {
  const therapyIds = new Set(therapies.map((t) => t.id));
  const ailmentIds = new Set(ailments.map((a) => a.id));
  const agentIds = new Set(agents.map((a) => a.id));

  it("ailment.therapyIds all resolve", () => {
    for (const a of ailments) {
      for (const tid of a.therapyIds) {
        expect(therapyIds.has(tid), `ailment "${a.id}" references unknown therapy "${tid}"`).toBe(true);
      }
    }
  });

  it("therapy.ailmentIds all resolve", () => {
    for (const t of therapies) {
      for (const aid of t.ailmentIds) {
        expect(ailmentIds.has(aid), `therapy "${t.id}" references unknown ailment "${aid}"`).toBe(true);
      }
    }
  });

  it("appointment.agentId resolves", () => {
    for (const appt of appointments) {
      expect(agentIds.has(appt.agentId), `appointment "${appt.id}" references unknown agent "${appt.agentId}"`).toBe(true);
    }
  });

  it("appointment.therapyId resolves", () => {
    for (const appt of appointments) {
      expect(therapyIds.has(appt.therapyId), `appointment "${appt.id}" references unknown therapy "${appt.therapyId}"`).toBe(true);
    }
  });
});
