declare module 'd3-scale' {
    export interface ScaleBand {
        (value: number): number;
        domain(values: number[]): this;
        range(values: number[]): this;
    }
    export interface ScaleLogarithmic {
        (value: number): number;
        base(base: number): this;
    }
    export interface ScalePower {
        (value: number): number;
        exponent(exp: number): this;
    }
    export interface ScaleTime {
        (value: Date): number;
        domain(values: Date[]): this;
        range(values: number[]): this;
    }
    export interface ScaleLinear {
        (value: number): number;
        domain(values: number[]): this;
        range(values: number[]): this;
    }
    export interface ScalePoint {
        (value: number | string): number;
        domain(values: (number | string)[]): this;
        range(values: number[]): this;
    }
    export interface ScaleOrdinal {
        (value: number | string): string;
        domain(values: (number | string)[]): this;
        range(values: string[]): this;
    }
    export interface ScaleSequential {
        (value: number): string;
        domain(values: number[]): this;
        range(values: string[]): this;
    }
    export interface ScaleThreshold {
        (value: number): string;
        domain(values: number[]): this;
        range(values: string[]): this;
    }
}
