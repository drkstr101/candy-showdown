/**
 * This example requires updating your template:
 *
 * ```
 * <html class="h-full bg-white">
 * <body class="h-full">
 * ```
 */
export default function Example() {
  return (
    <div className="flex min-h-full flex-col animate-in fade-in">
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl grow lg:flex">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1">
          <div className="border-b border-neutral-200 px-4 py-6 sm:px-6 lg:pl-8">
            <div className="relative h-[192px] overflow-hidden rounded-xl border border-dashed border-neutral-600 opacity-75">
              <svg className="absolute inset-0 h-full w-full stroke-neutral-100/25" fill="none">
                <defs>
                  <pattern
                    id="pattern-e65c4c0f-2107-4ff8-8f1a-e4204a4fd15f"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                  </pattern>
                </defs>
                <rect
                  stroke="none"
                  fill="url(#pattern-e65c4c0f-2107-4ff8-8f1a-e4204a4fd15f)"
                  width="100%"
                  height="100%"
                ></rect>
              </svg>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8">
            <div className="relative h-[367px] overflow-hidden rounded-xl border border-dashed border-neutral-600 opacity-75">
              <svg className="absolute inset-0 h-full w-full stroke-neutral-100/25" fill="none">
                <defs>
                  <pattern
                    id="pattern-7b69d9f9-ca30-48c9-a80a-268e7b084e52"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                  </pattern>
                </defs>
                <rect
                  stroke="none"
                  fill="url(#pattern-7b69d9f9-ca30-48c9-a80a-268e7b084e52)"
                  width="100%"
                  height="100%"
                ></rect>
              </svg>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-neutral-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8">
          {/* Right column area */}
          <div className="relative h-[256px] overflow-hidden rounded-xl border border-dashed border-neutral-600 opacity-75 lg:h-full">
            <svg className="absolute inset-0 h-full w-full stroke-neutral-100/25" fill="none">
              <defs>
                <pattern
                  id="pattern-1b61a508-0497-4b7f-8a04-44300b5c3e3a"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                </pattern>
              </defs>
              <rect
                stroke="none"
                fill="url(#pattern-1b61a508-0497-4b7f-8a04-44300b5c3e3a)"
                width="100%"
                height="100%"
              ></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
