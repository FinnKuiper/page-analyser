export type CheckId = "page-has-a-title" | "page-has-a-single-h1" | "using-headers-to-structure-content" | "headers-in-correct-order";

export interface CheckDefinition {
    id: CheckId;
    label: string;
    weight: number;
}

export interface CheckResult extends CheckDefinition {
    passed: boolean;
}

export const baseChecklist: CheckDefinition[] = [
    { id: "page-has-a-title", label: "Page has a title", weight: 1 },
    { id: "page-has-a-single-h1", label: "Page has a single H1", weight: 1 },
    { id: "using-headers-to-structure-content", label: "Using headers to structure content", weight: 1 },
    { id: "headers-in-correct-order", label: "Headers in correct order", weight: 1 },
];

export function createChecklist(): CheckResult[] {
    return baseChecklist.map(c => ({ ...c, passed: false }));
}

export function setCheck(checks: CheckResult[], id: CheckId, passed: boolean) {
    const check = checks.find(c => c.id === id);
    if (check) check.passed = passed;
}

export function computeScore(checks: CheckResult[]): number {
    const totalWeight = checks.reduce((acc, check) => acc + check.weight, 0);
    const achieved = checks.filter(c => c.passed).reduce((acc, check) => acc + check.weight, 0);
    return totalWeight === 0 ? 0 : (achieved / totalWeight) * 100;
}