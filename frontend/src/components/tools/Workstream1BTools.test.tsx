import { webcrypto } from 'node:crypto';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';

import AppIconResizerTool from './AppIconResizerTool';
import DnsPropagationCheckerTool from './DnsPropagationCheckerTool';
import TextPrefixSuffixAppenderTool from './TextPrefixSuffixAppenderTool';
import EditorconfigGeneratorTool from './EditorconfigGeneratorTool';
import PrometheusRecordingRulesGeneratorTool from './PrometheusRecordingRulesGeneratorTool';
import Base58EncoderTool from './Base58EncoderTool';
import CssToScssTool from './CssToScssTool';
import CspEvaluatorTool from './CspEvaluatorTool';
import JsonFlattenUnflattenTool from './JsonFlattenUnflattenTool';
import SolanaAddressValidatorTool from './SolanaAddressValidatorTool';
import X509CsrDecoderTool from './X509CsrDecoderTool';
import JsonKeySorterTool from './JsonKeySorterTool';
import Pbkdf2KeyDerivationTool from './Pbkdf2KeyDerivationTool';
import JwtExpiryCalculatorTool from './JwtExpiryCalculatorTool';
import ApacheConfFormatterTool from './ApacheConfFormatterTool';
import AvroToJsonSchemaTool from './AvroToJsonSchemaTool';
import DockerComposeFormatterTool from './DockerComposeFormatterTool';
import HarToK6Tool from './HarToK6Tool';
import JsonSchemaToZodTool from './JsonSchemaToZodTool';
import JsonToGraphqlQueryTool from './JsonToGraphqlQueryTool';
import ProtobufFormatterTool from './ProtobufFormatterTool';
import SubtitleSrtVttConverterTool from './SubtitleSrtVttConverterTool';
import TomlFormatterTool from './TomlFormatterTool';
import ZodToJsonSchemaTool from './ZodToJsonSchemaTool';
import ColorBlindnessSimulatorTool from './ColorBlindnessSimulatorTool';
import IpSupernettingCalculatorTool from './IpSupernettingCalculatorTool';
import CryptoUnitConverterTool from './CryptoUnitConverterTool';
import BignumberCalculatorTool from './BignumberCalculatorTool';
import BitwiseCalculatorTool from './BitwiseCalculatorTool';
import MultiRadixConverterTool from './MultiRadixConverterTool';
import GitConflictMarkerCleanerTool from './GitConflictMarkerCleanerTool';
import CorsPreflightInspectorTool from './CorsPreflightInspectorTool';
import SemverRangeEvaluatorTool from './SemverRangeEvaluatorTool';
import AesCryptoPlaygroundTool from './AesCryptoPlaygroundTool';
import JsonCsvGridEditorTool from './JsonCsvGridEditorTool';
import MatrixCalculatorTool from './MatrixCalculatorTool';
import AwsIamPolicyBuilderTool from './AwsIamPolicyBuilderTool';
import ReactHookFormGeneratorTool from './ReactHookFormGeneratorTool';
import ImageToBase64Tool from './ImageToBase64Tool';
import ImageColorExtractorTool from './ImageColorExtractorTool';

function renderWithLang(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

beforeAll(() => {
  if (!globalThis.crypto?.subtle) {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: webcrypto,
    });
  }
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe('Workstream 1B UI tools', () => {
  it('renders structured output without [object Object] for CSP, JSON Flatten, Solana, CSR, JSON Key Sorter, and JWT Expiry', async () => {
    const { container: csp } = renderWithLang(<CspEvaluatorTool />);
    expect(csp.textContent).not.toContain('[object Object]');
    expect(screen.getByTestId('csp-score-badge')).toHaveTextContent('/ 100');
    cleanup();

    const { container: flat } = renderWithLang(<JsonFlattenUnflattenTool />);
    expect(flat.textContent).not.toContain('[object Object]');
    const flatOut = screen.getByLabelText('Output') as HTMLTextAreaElement;
    expect(flatOut.value).toContain('"user.profile.name": "Alice"');
    fireEvent.click(screen.getByRole('button', { name: 'Unflatten JSON' }));
    expect((screen.getByLabelText('Output') as HTMLTextAreaElement).value).toContain('"profile"');
    cleanup();

    const { container: sol } = renderWithLang(<SolanaAddressValidatorTool />);
    expect(sol.textContent).not.toContain('[object Object]');
    expect(screen.getByTestId('solana-status-badge')).toHaveTextContent('Valid Solana Address');
    cleanup();

    const { container: csr } = renderWithLang(<X509CsrDecoderTool />);
    expect(csr.textContent).not.toContain('[object Object]');
    expect(csr.textContent).toContain('CN=example.com');
    await waitFor(() => expect(csr.textContent).toContain('Signature Valid'));
    cleanup();

    const { container: sorter } = renderWithLang(<JsonKeySorterTool />);
    expect(sorter.textContent).not.toContain('[object Object]');
    const sortedOut = (screen.getByLabelText('Alphabetically Sorted JSON') as HTMLTextAreaElement)
      .value;
    expect(sortedOut.indexOf('"a_first"')).toBeLessThan(sortedOut.indexOf('"z_last"'));
    cleanup();

    const { container: jwt } = renderWithLang(<JwtExpiryCalculatorTool />);
    expect(jwt.textContent).not.toContain('[object Object]');
    expect(jwt.textContent).toContain('Active');
  });

  it('fixes literal \\\\n samples in all 10 formatter/converter tools', () => {
    const components: Array<{ name: string; el: React.ReactElement; check: string }> = [
      { name: 'ApacheConf', el: <ApacheConfFormatterTool />, check: '  ServerName test.com' },
      { name: 'AvroToJsonSchema', el: <AvroToJsonSchemaTool />, check: '"title": "User"' },
      { name: 'DockerCompose', el: <DockerComposeFormatterTool />, check: 'services:' },
      { name: 'HarToK6', el: <HarToK6Tool />, check: "http.get('https://api.test.com')" },
      {
        name: 'JsonSchemaToZod',
        el: <JsonSchemaToZodTool />,
        check: 'email: z.string().optional()',
      },
      { name: 'JsonToGraphql', el: <JsonToGraphqlQueryTool />, check: 'query GetData' },
      { name: 'Protobuf', el: <ProtobufFormatterTool />, check: '  string name = 1;' },
      {
        name: 'SubtitleSrtVtt',
        el: <SubtitleSrtVttConverterTool />,
        check: '00:00:01.000 --> 00:00:04.000',
      },
      { name: 'Toml', el: <TomlFormatterTool />, check: 'name = "tool"' },
      { name: 'ZodToJsonSchema', el: <ZodToJsonSchemaTool />, check: '"type": "number"' },
    ];

    for (const item of components) {
      const { container } = renderWithLang(item.el);
      const textareas = container.querySelectorAll('textarea');
      const inputVal = (textareas[0] as HTMLTextAreaElement).value;
      const outputVal = (textareas[1] as HTMLTextAreaElement).value;
      expect(inputVal, item.name).not.toContain('\\n');
      expect(outputVal, item.name).toContain(item.check);
      cleanup();
    }
  });

  it('supports Base58 Encode/Decode, Prefix/Suffix controls, EditorConfig controls, Prometheus rules, and CSS to SCSS', () => {
    renderWithLang(<Base58EncoderTool />);
    const outBox = screen.getByLabelText('Base58 Output') as HTMLTextAreaElement;
    expect(outBox.value.length).toBeGreaterThan(5);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    expect((screen.getByLabelText('Decoded UTF-8 Output') as HTMLTextAreaElement).value).toBe(
      'Hello Bitcoin & Solana',
    );
    fireEvent.change(screen.getByLabelText('Base58 Input'), { target: { value: '0OIl' } });
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid Base58 character');
    cleanup();

    renderWithLang(<TextPrefixSuffixAppenderTool />);
    fireEvent.change(screen.getByLabelText('Prefix'), { target: { value: '- ' } });
    fireEvent.change(screen.getByLabelText('Suffix'), { target: { value: ';' } });
    expect(
      (screen.getByLabelText('Formatted Text with Delimiters') as HTMLTextAreaElement).value,
    ).toContain('- apple;\n\n- banana;');
    cleanup();

    renderWithLang(<EditorconfigGeneratorTool />);
    fireEvent.change(screen.getByLabelText('indent_style'), { target: { value: 'tab' } });
    fireEvent.change(screen.getByLabelText('end_of_line'), { target: { value: 'crlf' } });
    const ecOut = (screen.getByLabelText('Generated .editorconfig') as HTMLTextAreaElement).value;
    expect(ecOut).toContain('indent_style = tab');
    expect(ecOut).toContain('end_of_line = crlf');
    cleanup();

    renderWithLang(<PrometheusRecordingRulesGeneratorTool />);
    fireEvent.change(screen.getByLabelText('Group Name'), { target: { value: 'web_slo' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Rule' }));
    const promOut = (
      screen.getByLabelText('Prometheus SLO Recording & Alert Rules') as HTMLTextAreaElement
    ).value;
    expect(promOut).toContain('name: web_slo');
    expect(promOut).toContain('custom:metric_3:rate5m');
    cleanup();

    renderWithLang(<CssToScssTool />);
    const scssOut = screen.getByLabelText('Nested SCSS / SASS') as HTMLTextAreaElement;
    expect(scssOut.value).toContain('.card {');
    expect(scssOut.value).toContain('&:hover {');
  });

  it('runs PBKDF2 and AES-GCM asynchronously via WebCrypto in UI', async () => {
    renderWithLang(<Pbkdf2KeyDerivationTool />);
    fireEvent.change(screen.getByLabelText('Iterations'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Key Length (bytes)'), { target: { value: '16' } });
    await waitFor(() => {
      const out = (screen.getByLabelText(/Derived Key/) as HTMLTextAreaElement).value;
      expect(out).toMatch(/^[0-9a-f]{32}$/);
    });
    cleanup();

    renderWithLang(<AesCryptoPlaygroundTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Encrypt' }));
    await waitFor(() => {
      const cipher = (screen.getByLabelText(/^Ciphertext \(/) as HTMLTextAreaElement).value;
      expect(cipher.length).toBeGreaterThan(8);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Decrypt' }));
    await waitFor(() => {
      expect((screen.getByLabelText('Decrypted Plaintext') as HTMLTextAreaElement).value).toBe(
        '{"message":"Secret payload"}',
      );
    });
  });

  it('handles AppIconResizer file upload with URL.revokeObjectURL cleanup and DnsPropagationChecker DoH queries', async () => {
    const origCreateUrl = URL.createObjectURL;
    const origRevokeUrl = URL.revokeObjectURL;
    const createUrlSpy = vi.fn(() => 'blob:mock-icon');
    const revokeUrlSpy = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createUrlSpy });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeUrlSpy });

    const fakeCtx = {
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'low',
      fillStyle: '',
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      drawImage: vi.fn(),
    };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      fakeCtx as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((cb) => {
      cb(new Blob(['png'], { type: 'image/png' }));
    });

    class MockFileReader {
      result: string | ArrayBuffer | null = 'data:image/png;base64,AAAA';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      readAsDataURL() {
        this.onload?.();
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const OriginalImage = window.Image;
    class MockImage {
      naturalWidth = 1024;
      naturalHeight = 1024;
      width = 1024;
      height = 1024;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_val: string) {
        this.onload?.();
      }
    }
    vi.stubGlobal('Image', MockImage);
    Object.defineProperty(window, 'Image', { configurable: true, value: MockImage });

    const { unmount } = renderWithLang(<AppIconResizerTool />);
    const fileInput = screen.getByLabelText('Upload app icon image');
    const file = new File(['abc'], 'icon.png', { type: 'image/png' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => expect(createUrlSpy).toHaveBeenCalled());
    expect(screen.getAllByRole('link', { name: /PNG/ }).length).toBeGreaterThan(5);

    unmount();
    expect(revokeUrlSpy).toHaveBeenCalled();
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: origCreateUrl });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: origRevokeUrl });
    Object.defineProperty(window, 'Image', { configurable: true, value: OriginalImage });
    cleanup();

    const fetchSpy = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ Status: 0, Answer: [{ type: 1, TTL: 120, data: '76.76.21.21' }] }),
          {
            status: 200,
          },
        ),
    );
    vi.stubGlobal('fetch', fetchSpy);

    renderWithLang(<DnsPropagationCheckerTool />);
    await waitFor(() => expect(screen.getAllByText('Propagated')).toHaveLength(2));
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('wires math, color blindness, supernet, crypto units, CORS, SemVer, grid, matrix, IAM, RHF, and inline image error', () => {
    renderWithLang(<ColorBlindnessSimulatorTool />);
    expect(screen.getByText('#7a7a42', { exact: false })).toBeInTheDocument();
    cleanup();

    renderWithLang(<IpSupernettingCalculatorTool />);
    expect(screen.getByText('192.168.0.0/23')).toBeInTheDocument();
    cleanup();

    renderWithLang(<CryptoUnitConverterTool />);
    fireEvent.click(screen.getByRole('button', { name: /Bitcoin/ }));
    expect(screen.getByText('100000000')).toBeInTheDocument();
    cleanup();

    renderWithLang(<BignumberCalculatorTool />);
    fireEvent.change(screen.getByLabelText('Operator'), { target: { value: '**' } });
    fireEvent.change(screen.getByLabelText('Operand A'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Operand B'), { target: { value: '10' } });
    expect(screen.getByTestId('bigint-result')).toHaveTextContent('1024');
    cleanup();

    renderWithLang(<BitwiseCalculatorTool />);
    fireEvent.change(screen.getByLabelText('Operation'), { target: { value: 'OR' } });
    expect(screen.getByText('14', { exact: false })).toBeInTheDocument();
    cleanup();

    renderWithLang(<MultiRadixConverterTool />);
    fireEvent.change(screen.getByLabelText('Input Radix (Base)'), { target: { value: '16' } });
    fireEvent.change(screen.getByLabelText('Input Number'), { target: { value: 'FF' } });
    expect(screen.getByText(/DEC:\s*255/)).toBeInTheDocument();
    cleanup();

    renderWithLang(<GitConflictMarkerCleanerTool />);
    expect((screen.getByLabelText('Resolved Output') as HTMLTextAreaElement).value).toBe(
      'const API_URL = "https://api.v2.devstools.app";',
    );
    cleanup();

    renderWithLang(<CorsPreflightInspectorTool />);
    fireEvent.change(screen.getByLabelText('Access-Control-Allow-Origin'), {
      target: { value: '*' },
    });
    expect(screen.getByText('Blocked by Browser CORS')).toBeInTheDocument();
    cleanup();

    renderWithLang(<SemverRangeEvaluatorTool />);
    fireEvent.change(screen.getByLabelText(/Target Version/), { target: { value: '2.0.0' } });
    expect(screen.getByTestId('semver-match-badge')).toHaveTextContent('Incompatible');
    cleanup();

    renderWithLang(<JsonCsvGridEditorTool />);
    fireEvent.change(screen.getByLabelText('Row 1 Column 2'), { target: { value: 'Alicia' } });
    expect((screen.getByLabelText('Exported JSON output') as HTMLTextAreaElement).value).toContain(
      '"Alicia"',
    );
    cleanup();

    renderWithLang(<MatrixCalculatorTool />);
    fireEvent.change(screen.getByLabelText('Operation:'), { target: { value: 'add' } });
    expect(screen.getByText('[[3,2],[4,6]]')).toBeInTheDocument();
    cleanup();

    renderWithLang(<AwsIamPolicyBuilderTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Statement' }));
    expect(
      (screen.getByLabelText('Generated IAM Policy JSON') as HTMLTextAreaElement).value,
    ).toContain('Statement2');
    cleanup();

    renderWithLang(<ReactHookFormGeneratorTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Field' }));
    expect(
      (screen.getByLabelText('Generated React Component') as HTMLTextAreaElement).value,
    ).toContain("register('field4'");
    cleanup();

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { container: imgContainer } = renderWithLang(<ImageToBase64Tool />);
    const imgInput = imgContainer.querySelector('input[type="file"]') as HTMLInputElement;
    const badFile = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(imgInput, { target: { files: [badFile] } });
    expect(alertSpy).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders ImageColorExtractor palette swatches without nested button elements', async () => {
    const fakeCtx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Uint8ClampedArray([255, 0, 0, 255, 255, 0, 0, 255, 0, 0, 255, 255]),
      })),
    };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      fakeCtx as unknown as CanvasRenderingContext2D,
    );

    class MockFileReader {
      result = 'data:image/png;base64,AAAA';
      onload: ((e: ProgressEvent<FileReader>) => void) | null = null;
      readAsDataURL() {
        this.onload?.({ target: { result: this.result } } as ProgressEvent<FileReader>);
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const OriginalImage = window.Image;
    class MockImage {
      width = 2;
      height = 2;
      onload: (() => void) | null = null;
      set src(_val: string) {
        this.onload?.();
      }
    }
    Object.defineProperty(window, 'Image', { configurable: true, value: MockImage });

    const { container } = renderWithLang(<ImageColorExtractorTool />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['img'], 'sample.png', { type: 'image/png' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const copyBtn = await screen.findByRole('button', { name: /Copy #ff0000/i });
    expect(copyBtn.querySelector('button')).toBeNull();

    Object.defineProperty(window, 'Image', { configurable: true, value: OriginalImage });
  });
});
