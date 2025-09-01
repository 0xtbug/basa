export class LoadingUtils {
  /**
   * Start a loading indicator (console only)
   */
  static start(_id: string, text: string): void {
    if (text) console.log(text);
  }

  /**
   * Update indicator text (console only)
   */
  static update(_id: string, text: string): void {
    if (text) console.log(text);
  }

  /**
   * Succeed indicator (console only)
   */
  static succeed(_id: string, text?: string): void {
    if (text) console.log(text);
  }

  /**
   * Fail indicator (console only)
   */
  static fail(_id: string, text?: string): void {
    if (text) console.error(text);
  }

  /**
   * Stop indicator (no-op)
   */
  static stop(_id: string): void {
    // no-op
  }

  /**
   * Stop all indicators (no-op)
   */
  static stopAll(): void {
    // no-op
  }
}
